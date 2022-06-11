import { recordSaga } from "../helpers/recordSaga";
import { fetchAddressListSaga } from "./adressListSaga";
import { getAdressList } from "../actions/actions";

const data = { "addr1": "test", "addr2": "test" }
jest.mock("../api/api", () => ({ serverGetAdressList: jest.fn(() => data) }));

describe("adressListSaga", () => {
	it("getting adress list through api", async () => {
		const dispatched = await recordSaga(
			fetchAddressListSaga,
			getAdressList(data)
		);
		expect(dispatched).toEqual([
			{
				type: "FETCH_ADRESS_LIST_SUCCESS"
			}
		]);
	});

});