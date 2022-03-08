import { ListModel } from './../../../models/list.model';
export class ListService {
    public static async addList(data: any) {
        return ListModel.create({ ...data });
    }
    public static async getAllList() {
        return ListModel.find().sort({ createdAt: -1 });
    }
}
