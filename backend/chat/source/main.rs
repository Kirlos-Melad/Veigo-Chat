use actix_web::{web, App, HttpResponse, HttpServer, Responder};
// ^ Import (like C++ using-declarations) symbols from the actix_web crate:
//   - web: extractors and shared app data helpers
//   - App: the application builder (register routes, middleware)
//   - HttpResponse: explicit HTTP response builder (status, headers, body)
//   - HttpServer: the HTTP server (bind, run, worker threads)
//   - Responder: a trait ("interface") for types that can turn into HTTP responses

use serde::{Deserialize, Serialize};
// ^ Import the Serialize/Deserialize traits. With #[derive], Rust will generate the
//   boilerplate to convert your types to/from JSON. (In C++ you'd hand-write this.)

use std::sync::{Arc, Mutex};
// ^ Import Arc and Mutex from the standard library:
//   - Arc<T>: atomic reference-counted pointer (like thread-safe shared_ptr<T>).
//   - Mutex<T>: mutual exclusion lock guarding interior data (RAII unlock on drop).

use uuid::Uuid;
// ^ Random UUID v4 generator (for unique task IDs).

#[derive(Serialize, Deserialize, Clone)]
// ^ "derive" is like asking the compiler to auto-implement these traits:
//   - Serialize/Deserialize: make this struct JSON-compatible.
//   - Clone: enable cheap duplication (like generating a copy() in C++ when allowed).
//   Derives are zero-cost codegen (macros expand to real impls at compile time).

struct Task {
    // ^ Define a plain old data struct for our to-do item (like a C++ struct).
    id: String,          // UUID string identifying the task (could be a Uuid, we keep it simple).
    title: String,       // Human-readable title.
    completed: bool,     // Completion flag.
}

type Db = Arc<Mutex<Vec<Task>>>;
// ^ Type alias: our "database" is a vector of Task objects,
//   protected by a Mutex for safe mutation across threads,
//   and wrapped in Arc so we can share it across workers/handlers.
//   C++ analogy: using Db = std::shared_ptr<std::mutex_guarded<std::vector<Task>>>;
//   (Rust’s Mutex returns a guard object; lock released automatically on drop.)

// -----------------------
// Handlers (HTTP endpoints)
// -----------------------

// GET /tasks
async fn list_tasks(db: web::Data<Db>) -> impl Responder {
    // ^ 'async fn' compiles to a state machine (like C++20 coroutines).
    //   Actix will poll the returned Future until completion.
    //   'db: web::Data<Db>' is an extractor: Actix injects shared app state here.
    //   'impl Responder' means "this returns some type that implements Responder"
    //   (opaque return type, like "auto" constrained by an interface).

    let tasks = db.lock().unwrap();
    // ^ Lock the mutex to read the vector. If the lock is poisoned (previous panic),
    //   unwrap() will panic. For learning code this is fine; production code
    //   should handle errors (map to 500, etc.). Guard unlocks automatically at end of scope.

    HttpResponse::Ok().json(tasks.clone())
    // ^ Build a 200 OK HTTP response with JSON body.
    //   .json(...) serializes to JSON via serde.
    //   We clone the Vec<Task> so we can release the lock early and avoid holding it
    //   while Actix writes the response body.
}

// Data structure for POST /tasks body (JSON -> Rust).
#[derive(Deserialize)]
struct CreateTask {
    title: String,
}
// ^ Only need to read JSON into this type, so we derive Deserialize only.

// POST /tasks
async fn create_task(db: web::Data<Db>, payload: web::Json<CreateTask>) -> impl Responder {
    // ^ Two extractors:
    //   - db: shared mutable state (Arc<Mutex<...>>)
    //   - payload: JSON request body automatically parsed into CreateTask via serde.

    let mut tasks = db.lock().unwrap();
    // ^ We need a mutable lock guard to push into the vector.

    let task = Task {
        id: Uuid::new_v4().to_string(),
        // ^ Generate a random UUID and store it as a String.
        title: payload.title.clone(),
        // ^ Clone the String out of the JSON wrapper to own it in the new Task.
        completed: false,
        // ^ New tasks start incomplete.
    };

    tasks.push(task.clone());
    // ^ Store the new task in our in-memory "DB".
    //   Clone so we can still return a copy in the response below.

    HttpResponse::Created().json(task)
    // ^ Return HTTP 201 Created with the created Task as JSON.
}

// GET /tasks/{id}
async fn get_task(db: web::Data<Db>, id: web::Path<String>) -> impl Responder {
    // ^ 'id' is captured from the URL path parameter and parsed as String.

    let tasks = db.lock().unwrap();
    // ^ Read lock (immutable guard) is enough because we only search.

    if let Some(task) = tasks.iter().find(|t| t.id == *id) {
        // ^ Iterate over the vector and look for matching id.
        //   *id dereferences the Path<String> to &String for comparison.

        HttpResponse::Ok().json(task)
        // ^ Found → 200 OK with JSON body.
    } else {
        HttpResponse::NotFound().finish()
        // ^ Not found → 404 with empty body.
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // ^ Attribute macro that generates a Tokio runtime and runs this async main.
    //   Signature returns io::Result so we can use the '?' operator on fallible ops.

    let db: Db = Arc::new(Mutex::new(Vec::new()));
    // ^ Initialize our shared, thread-safe, empty task store:
    //   - Vec::new()      -> empty dynamic array
    //   - Mutex::new(...) -> lockable container
    //   - Arc::new(...)   -> share across threads by reference counting

    let server = HttpServer::new(move || {
        // ^ Build an App instance for each worker thread.
        //   'move' captures variables by move into the closure's environment,
        //   here we want to capture 'db'. Each call clones the Arc (cheap).

        App::new()
            // ^ Start building the Actix application (routing table, data, middleware).

            .app_data(web::Data::new(db.clone()))
            // ^ Register our shared state with the app:
            //   - db.clone(): increments Arc’s refcount (no deep copy).
            //   - web::Data::new: wraps it so handlers can request web::Data<Db>.

            .route("/tasks", web::get().to(list_tasks))
            // ^ Map GET /tasks to the list_tasks handler.

            .route("/tasks", web::post().to(create_task))
            // ^ Map POST /tasks to create_task.

            .route("/tasks/{id}", web::get().to(get_task))
            // ^ Map GET /tasks/<uuid> to get_task; '{id}' binds to web::Path<String>.
    })
    .bind(("127.0.0.1", 8080))?;
    // ^ Bind server socket to localhost:8080. This can fail (port in use, permissions),
    //   so we use '?' to propagate the error as io::Error from main.

    // At this point the server is configured but not running yet.
    println!("Server running at http://127.0.0.1:8080");

    server
    .run()
    // ^ Start worker threads and begin serving connections.

    .await
    // ^ Await the server future until it completes (usually on shutdown signal).

}
