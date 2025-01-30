import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 8002;

app.set("trust proxy", true);

app.use(cors());
app.use(morgan("combined"));

app.get("/:path", (_, res) => {
  // res.sendFile(__dirname + '/joke.jpg')
  res.json({
    data: "IMAGE",
  });
});

app.listen(port, () => console.log("Server is running"));
