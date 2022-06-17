import { recordSaga } from "../helpers/recordSaga";
import { getRouteDataSaga } from "./routeSaga";
import { getRouteData } from "../actions/actions";

const coords = [["coord1"], ["coord2"]]
jest.mock("../api/api", () => ({ serverGetCoords: jest.fn(() => coords) }));

describe("routeSaga", () => {
	describe("#GET_ROUTE_DATA", () => {
		it("getting coords through api", async () => {
			const dispatched = await recordSaga(
				getRouteDataSaga,
				getRouteData("from", "to")
			);
			expect(dispatched).toEqual([
				{
					type: "FETCH_ROUTE_SUCCESS"
				}
			]);
		});
	});
});