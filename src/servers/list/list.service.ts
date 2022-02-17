import { ListModel } from '../../models/list.model';

export class ListService {
    public static async addNewList(data: any) {
        return ListModel.create(data);
    }
}
