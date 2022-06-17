import { recordSaga } from "../helpers/recordSaga";
import { fetchAddressListSaga } from "./adressListSaga";
import { getAdressList } from "../actions/actions";
import { serverGetAdressList } from '../api/api';

jest.mock("../api/api");

describe("adressListSaga", () => {

	it("getting adress list through api", async () => {

		serverGetAdressList.mockImplementation(() => ["addr1", "addr1"]);

		const dispatched = await recordSaga(fetchAddressListSaga, getAdressList());

		expect(serverGetAdressList).toBeCalled();

		expect(dispatched).toEqual([
			{
				type: "FETCH_ADRESS_LIST_SUCCESS",
				payload: ["addr1", "addr1"]
			}
		])
	})

});