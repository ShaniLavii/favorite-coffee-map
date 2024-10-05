const path = require("path");

module.exports = {
  entry: "./src/index.js", // Add your entry point
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "public"), // Output directory
    publicPath: "/", // This sets the public URL of the output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-private-methods",
            ],
          },
        },
      },
      // Rule for processing CSS files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader for CSS files
      },
      // Rule for processing image files
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Regex for image formats
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]", // Keeps original file name and path
              publicPath: "/", // Set public path for images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true, // This will help with routing if you use react-router
  },
};
