import { recordSaga } from "../helpers/recordSaga";
import { authenticateSaga } from "./authSaga";
import { authenticate } from "../actions/actions";
import { serverLogIn, serverGetCardData } from '../api/api';

jest.mock("../api/api");

describe("authSaga", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	describe("#AUTHENTICATE", () => {
		it("authenticates through api", async () => {

			serverLogIn.mockImplementation(() => (
				{ success: true, token: 'test' }
			));

			serverGetCardData.mockImplementation(() => (
				{ cardNumber: "test", expiryDate: "test", cardName: "test", cvc: "test", id: "test" }
			));

			const dispatched = await recordSaga(
				authenticateSaga,
				authenticate("testemail", "testpassword"),
			);

			expect(serverLogIn).toBeCalledWith("testemail", "testpassword");

			expect(dispatched).toEqual([
				{ type: 'LOG_IN' },
				{ type: 'GET_TOKEN', token: 'test' },
				{
					type: "SAVED_CARD_DATA",
					payload: { cardNumber: "test", expiryDate: "test", cardName: "test", cvc: "test", id: "test" }
				}
			])
		});
	});

});