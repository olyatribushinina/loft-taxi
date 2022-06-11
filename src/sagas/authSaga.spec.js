import { recordSaga } from "../helpers/recordSaga";
import { authenticateSaga, registrationSaga } from "./authSaga";
import { authenticate, registration } from "../actions/actions";

const data = {
	success: true,
	token: "testtoken"
}

jest.mock("../api/api", () => ({ serverLogIn: jest.fn(() => (data)) }));
jest.mock("../api/api", () => ({ serverRegistration: jest.fn(() => (data)) }));

describe("authSaga", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	describe("#AUTHENTICATE", () => {
		it("authenticates through api", async () => {

			const dispatched = await recordSaga(
				authenticateSaga,
				authenticate("testemail", "testpassword"),
			);
			expect(dispatched).toEqual([
				{
					type: "LOG_IN"
				},
				{
					type: "GET_TOKEN"
				}
			]);
		});
	});

	describe("REGISTRATION", () => {
		it("registration through api", async () => {
			const dispatched = await recordSaga(
				registrationSaga,
				registration("testemail", "testpassword", "testname", "testsurname")
			);

			expect(dispatched).toEqual([
				{
					type: "LOG_IN"
				},
				{
					type: "GET_TOKEN"
				},
				{
					type: "SAVED_USER_DATA"
				}
			]);
		});
	});
});
