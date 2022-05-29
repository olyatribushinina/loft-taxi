import { authMiddleware } from './authMiddleware';
import { authenticate, registration, saveProfileCardData } from "./actions";
import { serverLogIn, serverRegistration, serverSaveProfileCardData } from "./api";

jest.mock("./api", () => ({ serverLogIn: jest.fn(() => true) }));
jest.mock("./api", () => ({ serverRegistration: jest.fn(() => true) }));
jest.mock("./api", () => ({ serverSaveProfileCardData: jest.fn(() => true) }));

describe("authMiddleware", () => {
	afterAll(jest.clearAllMocks)

	describe("#AUTHENTICATE", () => {
		describe("with correct credentials", () => {
			it("authenticates through api", async () => {
				serverLogIn.mockImplementation(async () => true);
				const dispatch = jest.fn();

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
				serverLogIn.mockImplementation(() => false);
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
				serverRegistration.mockImplementation(async () => true);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					registration("testlogin", "testpassword", "testname", "testsurname")
				);
				expect(serverRegistration).toBeCalledWith("testlogin", "testpassword", "testname", "testsurname");
				expect(dispatch).toBeCalledWith({
					type: "LOG_IN",
				});
			});
		});
		describe("with wrong credentials", () => {
			it("registration through api", async () => {
				serverRegistration.mockImplementation(() => false);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					registration("testlogin", "testpassword", "testname", "testsurname")
				);
				expect(dispatch).not.toBeCalled();
			});
		});
	});

	describe("#SAVE_PROFILE_CARD_DATA", () => {
		describe("with correct credentials", () => {
			it("saveProfileCardData through api", async () => {
				serverSaveProfileCardData.mockImplementation(async () => true);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					saveProfileCardData("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv")
				);
				expect(serverSaveProfileCardData).toBeCalledWith("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv");
				// expect(dispatch).toBeCalledWith({
				// 	type: "LOG_IN",
				// });
			});
		});
		describe("with wrong credentials", () => {
			it("saveProfileCardData through api", async () => {
				serverSaveProfileCardData.mockImplementation(() => false);
				const dispatch = jest.fn();

				await authMiddleware({ dispatch })()(
					saveProfileCardData("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv")
				);
				expect(dispatch).not.toBeCalled();
			});
		});
	});
});
