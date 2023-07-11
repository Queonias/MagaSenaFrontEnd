const { requestPost } = require("@/service/requests");

async function checkAuthenticationRequest(token) {
  try {
    await requestPost("/user/me", {}, token);
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    } else {
      throw new Error("An error occurred");
    }
  }
}

function checkAuthenticationRouter(router) {
  if (router) {
    router.replace('/users/login');
  }
}

export async function checkAuthentication(token, router) {
  try {
    await checkAuthenticationRequest(token);
  } catch (err) {
    checkAuthenticationRouter(router);
    throw err;
  }
}