const http = require("http");
const PORT = 5000;

// Finish setting up the server
http
  .createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    response.setHeader("content-type", "text/html");
    const dataChunksArray = [];

    request.on("data", (chunk) => {
      dataChunksArray.push(chunk);
    });

    request.on("end", () => {
      if (method == "GET") {
        const body = JSON.parse(Buffer.concat(dataChunksArray).toString());
        const responseBody = { method, url, body };
        console.log(url, method);
        if (url == "/") {
          console.log("home route");
          response.end("Heyy geeksforgeeks");
          //   response.write(JSON.stringify(responseBody));
          response.statusCode = 200;
        } else if (url == "/about") {
          response.write(
            "<h2>This is the story all about how my life got flipped-turned upside down</h2>"
          );
          response.statusCode = 200;
        } else if (url == "/echo") {
          response.write("Blah");
          request.statusCode = 202;
        } else {
          console.error("route not found");
          response.write("<h1>Page Not Found</h1>");
          response.statusCode = 404;
        }

        response.end();
      }
    });
  })
  .listen(PORT, () => {
    console.log(`server is listening at local host ${PORT} port`);
  });
