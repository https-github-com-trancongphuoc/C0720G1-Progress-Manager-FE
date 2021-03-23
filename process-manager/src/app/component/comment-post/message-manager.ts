import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageManager {
  constructor(public toastrService: ToastrService) {
  }

  showMessageCreateNotRole() {
    this.toastrService.error("Thêm mới thất bại. Bạn đang cố phá hoại", "Thông báo");
  }

  showMessageCreateCommentSuccess() {
    this.toastrService.success("Đăng bình luận thành công", "Thông báo");
  }

  showMessageDeleteSuccess() {
    this.toastrService.success('Xóa bình luận thành công!', 'Thông báo')
  }

  showMessageUpdateSuccess() {
    this.toastrService.success('Sửa bình luận thành công!', 'Thông báo')
  }

  showMessageCreatePostSuccess(){
    this.toastrService.success("Đăng câu hỏi thành công", "Thông báo");
  }
  showMessageSearch(){
    this.toastrService.warning("Tìm kiếm không thành công", "Thông báo");
  }
}
