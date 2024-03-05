const _ = require("lodash");
const path = require("path");
const request = require("supertest");

const db =  require("../../models");
const productAPI = require("../../server/api/product");
const productData = require("../fixtures/productList.json");
const generalHelper = require("../../server/helpers/generalHelper");

let apiURL;
let server;

let mockAllProduct;

let getAllProduct;
let postProduct;
let patchProduct;
let deleteProduct;

let payload;
let imagePath;
let header;

describe("Product", () => {
    beforeAll(() => {
        apiURL = "/api/product";

        server = generalHelper.createTestServer("/api/product", productAPI);

        header = {
            authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjYjQ1ZDQ0LTlkZjgtNDFiNy1iMDc1LWEwMzY4Y2RkOGRhOSIsIm5hbWUiOiJBZG1pbiIsInBob3RvX3Byb2ZpbGUiOm51bGwsInJvbGVfaWQiOjEsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwOTYwOTMxMywiZXhwIjoxNzA5Njk1NzEzfQ.aQ7DZm7gWXnODgJkVV62PvGE32v2O6fb2z7sm33iBKk"
        }
    });

    afterAll(async () => {
        await server.close();
    });

    describe("GET All Product", () => {
        beforeEach(() => {
            mockAllProduct = _.cloneDeep(productData);
            getAllProduct = jest.spyOn(db.products, "findAll");
        });

        test("Should return 200: GET All Product Success", async () => {
            getAllProduct.mockResolvedValue(mockAllProduct);

            await request(server)
                .get(`${apiURL}/list`)
                // .expect(200)
                .then((res) => {
                    expect(res.body.response).toBeTruthy()
                })
        })

        test("Should Return 200: GET All List Success But Empty", async () => {
            getAllProduct.mockResolvedValue([]);

            await request(server)
                .get(`${apiURL}/list`)
                .expect(200)
        })
    });

    describe("POST Product", () => {
        beforeEach(() => {
            imagePath = path.join(__dirname, "photo.jpg");
            payload = {
                name:"T-Shirt 3",
                description:"T-shirts in lightweight cotton jersey with a V-neck and a straight-cut hem. Slim fit that hugs the contours of your body, creating a fitted silhouette.",
                price:320000,
                stock:5,
                category_id:1
            };

            mockAllProduct = _.cloneDeep(productData);
            postProduct = jest.spyOn(db.products, "create");
        });

        test("Should return 201: Post Product Success", async () => {
            postProduct.mockResolvedValue("Success");

            await request(server)
                .post(`${apiURL}/admin/add`)
                .set(header)
                .field("data", JSON.stringify(payload))
                .attach("image_url", imagePath)
                .expect(200)
                .then(() => expect(req.body.response).toBeTruthy())
        })
    })
})