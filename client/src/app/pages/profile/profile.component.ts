import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileFormDialogComponent } from './components/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../../../models/user.model';
import { NgStyle } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, SharedModule, NgStyle],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit, OnInit, OnDestroy {
  // user: UserModel = {
  //   id: '1',
  //   userName: 'Gia Huy',
  //   email: 'dhghuy@gmail.com',
  //   avatarURL:
  //     'data:image/jpeg;base64,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',
  //   wallPaperURL:
  //     'data:image/jpeg;base64,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',
  //   joinedDate: 'N/A',
  // };

  user$ = this.store.select('user', 'user');
  user: UserModel | null = null;

  @ViewChild('myBackground') background?: ElementRef;

  bookCard: any[] = [
    {
      id: 1,
      title: 'Đợi Tới Khi Ve Xanh Rụng',
      img: '../public/assets/profile_pictures/img.png',
      author: 'Đinh Mặc',
      year: 'N/A',
      summary:
        'Bảy năm trước vào một đêm khuya, cảnh sát hình sự Lý Cẩn Thành mất tích bí ẩn tại làng đô thị...',
    },
    {
      id: 2,
      title: 'Lên Nhầm Kiệu Hoa',
      img: '../public/assets/profile_pictures/img_1.png',
      author: 'Lục Dược',
      year: 'N/A',
      summary:
        'Hết làm cha rồi đến làm mẹ, làm xong sư phụ rồi lại đến làm trượng phu...',
    },
    {
      id: 3,
      title: 'Anh Trai Nhân Vật Chính',
      img: '../public/assets/profile_pictures/img_2.png',
      author: 'Tiên Sắc Xám',
      year: 'N/A',
      summary:
        'Ở kiếp này, Khan là anh trai nhân vật chính nhưng số mệnh của hắn lại không may mắn hưởng ké được miếng hào quang nào của cậu ta.' +
        ' Khan lấy lại được ký ức tiền kiếp mình trong hoàn cảnh hoàn toàn bất lợi. Hắn nhận ra mình chỉ là một nhân vật phụ, một nhân vật phản diện bé nhỏ trong bộ tiểu thuyết dài kỳ được viết bởi nhỏ em gái của mình ở kiếp trước viết ra...',
    },
    {
      id: 4,
      title: 'Bắc Phái Đạo Mộ Bút Ký',
      img: '../public/assets/profile_pictures/img_3.png',
      author: 'Vân Phong',
      year: 'N/A',
      summary:
        'Tôi là một đứa trẻ nghèo đến từ một ngôi làng miền núi ở Đông Bắc Trung Quốc, vào đầu thế kỷ 20, ...',
    },
    {
      id: 5,
      title: 'Chí Tôn Kiếm Đế',
      img: '../public/assets/profile_pictures/img_4.png',
      author: 'Lâm Nhất',
      year: 'N/A',
      summary: 'Diệp Thanh là thế tử Diệp gia, vừa có tài, lại có thân phận...',
    },
    {
      id: 6,
      title: 'Tướng Quân Tại Thượng',
      img: '../public/assets/profile_pictures/img_5.png',
      author: 'Trúc Lâm Thâm Xứ',
      year: 'N/A',
      summary:
        'Một giấc tỉnh dậy, ta thấy mình nằm trên giường của kẻ thù. Hắn áo quần xộc xệch, đầy dấu vết đỏ, khoé mắt và chân mày đều mang vẻ mờ ám...',
    },
    {
      id: 7,
      title: '430 Triệu Năm Của Cô Ấy',
      img: '../public/assets/profile_pictures/img_6.png',
      author: 'Quân Tử Dĩ Trạch',
      year: 'N/A',
      summary:
        'Vào sinh nhật 18 tuổi, Lê Tử được cha mình nói: “Thực ra mẹ con có gen không phải người…”...',
    },
  ];

  cmtCard: any[] = [
    {
      id: 1,
      title: 'Đợi Tới Khi Ve Xanh Rụng',
      img: '../public/assets/profile_pictures/img.png',
      time: '1 giờ trước',
      content: 'Truyện hay, nhưng kết thúc hơi vội',
    },
    {
      id: 2,
      title: 'Lên Nhầm Kiệu Hoa',
      img: '../public/assets/profile_pictures/img_1.png',
      time: '2 giờ trước',
      content: 'Truyện rất hay, ra nhanh di',
    },
    {
      id: 3,
      title: 'Anh Trai Nhân Vật Chính',
      img: '../public/assets/profile_pictures/img_2.png',
      time: '3 giờ trước',
      content: 'Truyện rất giả tưởng, nhưng rất hay',
    },
    {
      id: 4,
      title: 'Bắc Phái Đạo Mộ Bút Ký',
      img: '../public/assets/profile_pictures/img_3.png',
      time: '4 giờ trước',
      content: 'Truyện rất thú vị, nhưng hơi dài',
    },
    {
      id: 5,
      title: 'Chí Tôn Kiếm Đế',
      img: '../public/assets/profile_pictures/img_4.png',
      time: '5 giờ trước',
      content: 'Truyện rất hai`, nhưng kết thúc hơi tệ',
    },
    {
      id: 6,
      title: 'Tướng Quân Tại Thượng',
      img: '../public/assets/profile_pictures/img_5.png',
      time: '6 giờ trước',
      content: 'Truyện ra nhanh lắm, nhưng hơi ngắn',
    },
    {
      id: 7,
      title: '430 Triệu Năm Của Cô Ấy',
      img: '../public/assets/profile_pictures/img_6.png',
      time: '7 giờ trước',
      content: 'Truyện rất mơ mộng, nhưng hơi tiêu cực',
    },
  ];

  subscription: Subscription[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ user: UserState }>,
  ) {}

  ngAfterViewInit() {
    this.subscription.push(
      this.user$.subscribe((value) => {
        if (value) {
          if (this.background) {
            this.background.nativeElement.style.backgroundImage = `url(${value.wallPaperURL})`;
            this.user = value;
          }
        }
      }),
    );
  }

  removeBookCard(index: number) {
    const [removed] = this.bookCard.splice(index, 1);

    this._snackBar.open('Đã bỏ theo dõi', 'Đóng', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileFormDialogComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {}
}
