const data = [
  {
    email: "test@test.com",
    isValid: true,
  },
];

function getDataFromRequest(req: any) {
  return new Promise((resolve, reject) => {
    let requestBody = "";

    req.on("data", (chunk: any) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(requestBody);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export default defineEventHandler(async (event) => {
  const req = event.node.req;
  const res = event.node.res;
  let response;
  try {
    const parsedBody: any = await getDataFromRequest(req);
    const { email, isValid } = parsedBody;

    let result;
    if (email === data[0].email) {
      console.log("Email is valid");
      result = true;
    } else {
      console.log("Emails is not valid");
      result = false;
    }

    response = {
      result,
    };

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  } catch (error) {
    console.error("Error occured:", error);
    res.statusCode = 500;
    res.end();
  }
  return { response };
});
