import { authMiddleware } from './authMiddleware';
import { authenticate, registration, saveUserCardData } from "./actions";
import { serverLogIn, serverRegistration, serverSaveUserCardData } from "./api";

const data = {
	success: true,
	token: "testtoken"
}

jest.mock('./api');

describe("authMiddleware", () => {
	afterAll(jest.clearAllMocks)

	describe("#AUTHENTICATE", () => {
		describe("with correct credentials", () => {
			it("authenticates through api", async () => {
				serverLogIn.mockImplementation(() => data)
				const dispatch = jest.fn();
				const getToken = jest.fn();
				await authMiddleware({ dispatch })()(
					authenticate("testlogin", "testpassword")
				);
				expect(serverLogIn).toBeCalledWith("testlogin", "testpassword");
				expect(dispatch).toBeCalledWith({
					type: "LOG_IN",
				});
			});
		});
		describe("with wrong credentials", () => {
			it("authenticates through api", async () => {
				serverLogIn.mockImplementation(() => data == null)
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					authenticate("testlogin", "testpassword")
				);
				expect(dispatch).not.toBeCalled();
			});
		});
	});

	describe("#REGISTRATION", () => {
		describe("with correct credentials", () => {
			it("registration through api", async () => {
				serverRegistration.mockImplementation(() => data)
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					registration("testlogin", "testpassword", "testname", "testsurname")
				);
				expect(serverRegistration).toBeCalledWith("testlogin", "testpassword", "testname", "testsurname");
				expect(dispatch).toBeCalledWith({
					type: "LOG_IN"
				});
			});
		});
		describe("with wrong credentials", () => {
			it("registration through api", async () => {
				serverRegistration.mockImplementation(() => data.success = false);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					registration("testlogin", "testpassword", "testname", "testsurname")
				);
				expect(dispatch).not.toBeCalled();
			});
		});
	});

	describe("#SAVE_USER_CARD_DATA", () => {
		describe("with correct credentials", () => {
			it("saveUserCardData through api", async () => {
				serverSaveUserCardData.mockImplementation(() => true)
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					saveUserCardData("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv", "testtoken")
				);
				expect(serverSaveUserCardData).toBeCalledWith("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv", "testtoken");
				expect(dispatch).toBeCalledTimes(1)
			});
		});
		describe("with wrong credentials", () => {
			it("saveUserCardData through api", async () => {
				serverSaveUserCardData.mockImplementation(async () => false);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					saveUserCardData("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv", "testtoken")
				);
				expect(dispatch).not.toBeCalled();
			});
		});
	});
});
