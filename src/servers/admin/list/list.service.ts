import { ListModel } from './../../../models/list.model';
export class ListService {
    public static async addList(data: any) {
        return ListModel.create({ ...data });
    }
    public static async getAllList() {
        return ListModel.find().sort({ createdAt: -1 });
    }
    public static async changeStatus(id: string) {
        const list = await ListModel.findById(id);
        if (list) {
            list.status = !list.status;
            await list.save();
        }
    }
    public static async removeList(id: string) {
        return ListModel.findByIdAndRemove(id);
    }
    public static async getDetailById(id: string) {
        return ListModel.findById(id);
    }
    public static updateList(id: string, data: any) {
        return ListModel.findByIdAndUpdate(id, { ...data });
    }
}
