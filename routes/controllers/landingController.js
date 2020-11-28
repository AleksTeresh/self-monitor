const showLandingPage = async ({ render, request, response, session }) => {
  render("index.ejs");
};

export { showLandingPage }
