import { Request, Response } from 'express';

export const SupperAdminAuthentication = async (req: Request | any, res: Response, next) => {
    if (req.session.admin) {
        if (req.session.admin.role == 1) {
            return next();
        }
        return res.status(400).json({ message: 'Bạn Không Đủ Quyền' });
    } else {
        return res.redirect('/admin/login');
    }
};
