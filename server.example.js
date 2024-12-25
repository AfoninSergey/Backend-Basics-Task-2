const server = http.createServer(async (req, res) => {
	if (req.method === "GET") {
		const htmlContent = await fs.readFile(
			path.join(basePath, "index.html"),
			{ encoding: "utf-8" }
		);

		// res.setHeader("Content-Type", "text/html");
		res.writeHead(200, { "Content-Type": "text/html, Charset=utf-8" });

		res.end(htmlContent);
	} else if (req.method === "POST") {
		const body = [];

		res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

		req.on("data", (data) => {
			body.push(Buffer.from(data));
		});

		req.on("end", async () => {
			const title = body.toString().split("=")[1].replaceAll("+", " ");
			await addNote(title);
			res.end(`Title = "${title}"`);
		});
	}
	// console.log("req.url", req.url);
});

server.listen(port, () => {
	console.log(
		chalk.greenBright.inverse(`Server has been started on port: ${port}`)
	);
});
