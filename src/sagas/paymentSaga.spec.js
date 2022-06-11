import { recordSaga } from "../helpers/recordSaga";
import { saveCardDataSaga } from "./paymentSaga";
import { saveUserCardData, getUserCardData } from "../actions/actions";

const userCardData = { 'cardNumber': 'testnumber', 'expiryDate': 'testexpiry', 'cardName': 'testname' }

jest.mock("../api/api", () => ({ serverPostCardData: jest.fn(() => true) }));
jest.mock("../api/api", () => ({ serverGetCardData: jest.fn(() => (userCardData)) }));

describe("paymentSaga", () => {
	describe("#SAVE_USER_CARD_DATA", () => {
		it("saveUserCardData through api", async () => {
			const dispatched = await recordSaga(
				saveCardDataSaga,
				saveUserCardData("testcardholdername", "testcardnumber", "testcarddata", "testcardcvv", "testtoken")
			);
			expect(dispatched).toEqual([
				{
					type: "SAVED_CARD_DATA"
				}
			]);
		});
	});

	describe("#GET_USER_CARD_DATA", () => {
		it("saveUserCardData through api", async () => {
			const dispatched = await recordSaga(
				saveCardDataSaga,
				getUserCardData(userCardData)
			);
			expect(dispatched).toEqual([
				{
					type: "SAVED_CARD_DATA"
				}
			]);
		});
	});
});
