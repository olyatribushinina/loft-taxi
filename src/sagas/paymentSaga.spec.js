import { recordSaga } from "../helpers/recordSaga";
import { saveCardDataSaga } from "./paymentSaga";
import { saveUserCardData } from "../actions/actions";
import { serverPostCardData } from '../api/api';

jest.mock("../api/api");

describe("paymentSaga", () => {

	describe("#SAVE_USER_CARD_DATA", () => {

		it("saveUserCardData through api", async () => {

			const cardNumber = 'testnumber',
				cardExpiryDate = 'testexpiry',
				cardUserName = 'testname',
				cardCvc = "test",
				token = 'testtoken';

			serverPostCardData.mockImplementation(() => true);

			const dispatched = await recordSaga(
				saveCardDataSaga,
				saveUserCardData(cardNumber, cardExpiryDate, cardUserName, cardCvc, token)
			);

			expect(serverPostCardData).toBeCalledWith(cardNumber, cardExpiryDate, cardUserName, cardCvc, token);

			expect(dispatched).toEqual([
				{
					type: "SAVED_CARD_DATA",
					payload: {
						cardName: "testname",
						cardNumber: "testnumber",
						cvc: "test",
						expiryDate: "testexpiry",
						token: "testtoken",
					},
				}
			]);
		});
	});
});