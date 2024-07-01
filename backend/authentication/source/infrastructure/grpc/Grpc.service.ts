import { UntypedServiceImplementation } from "@grpc/grpc-js";

import DatabaseManager from "@source/infrastructure/database/DatabaseManager";

abstract class GrpcService<T extends UntypedServiceImplementation> {
	protected mDatabaseManager: DatabaseManager;

	constructor(dbManager: DatabaseManager) {
		this.mDatabaseManager = dbManager;
	}

	public abstract get handlers(): T;
}

export default GrpcService;
