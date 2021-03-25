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

  showMessageCreateStudentExcel(number: number){
    this.toastrService.success("Bạn đã thêm mới " + number + " danh sách sinh viên thành công", "Thông báo");
  }

  showMessageDeleteStudentExcel(){
    this.toastrService.success("Bạn đã xóa bớt một sinh viên thành công", "Thông báo");
  }

  showMessageCreateTeacherExcel(number: number){
    this.toastrService.success("Bạn đã thêm mới " + number + " danh sách giảng viên thành công", "Thông báo");
  }

  showMessageDeleteTeacherExcel(){
    this.toastrService.success("Bạn đã xóa bớt một giảng viên thành công", "Thông báo");
  }
}
