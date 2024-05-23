import graphqlPlaygroundHtml from "graphql-playground-html";

const GQLPlayground = function (
	options: graphqlPlaygroundHtml.MiddlewareOptions,
) {
	return function (req: any, res: any, next: any) {
		res.setHeader("Content-Type", "text/html");
		const playground = graphqlPlaygroundHtml.renderPlaygroundPage(options);
		res.write(playground);
		res.end();
	};
};

export default GQLPlayground;
