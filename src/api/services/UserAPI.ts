import { User } from "../../interfaces/UserInterface";
interface ListUsersResponse {
    results: User[];
}

interface ListUsersRequest {
    parent: string;
    filter: string;
}
export default class UserAPI {

    getUser(): void{
        return "";
    }

}

