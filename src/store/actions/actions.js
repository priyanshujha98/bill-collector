import * as loginActions from "./login.action"
import * as networkActions from "./network.action"
import * as userActions from "./user.action"
import * as billActions from "./bill.action"
import * as locationActions from "./location.action"
const actions = {
    ...loginActions,
    ...networkActions,
    ...userActions,
    ...billActions,
    ...locationActions
}

export default actions