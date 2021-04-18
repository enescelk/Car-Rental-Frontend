import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';
import { carDetailAndImagesDto } from 'src/app/models/CarDetailAndImagesDto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  carDetail: carDetailAndImagesDto;
  amountOfPayment: number = 0;
  dataLoaded: boolean = false;
  creditCardAddForm: FormGroup;
  creditCards: CreditCard[] = [];
  creditCard: CreditCard;
  currentCard: CreditCard;
  saveCart = false;
  paymentModel: CreditCard

  cardNumber: number;
  nameOnTheCard: string;
  expirationDate: string;
  cvv: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private router: Router,
    private toastrService: ToastrService,
    private creditCardService: CreditCardService,
    private formBuild: FormBuilder,
    private authService: AuthService,
    private rentalService: RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["myrental"]) {
        this.rental = JSON.parse(params['myrental']);
        this.getCarDetail();
      }
    })
    this.createCreditCardAddForm();
    this.getCardsByCustomer();
  }

  createCreditCardAddForm() {
    this.creditCardAddForm = this.formBuild.group({
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
      customerId: [Number(this.rental.customerId), Validators.required]
    });
  }

  getCarDetail() {
    this.carDetailService.getCarDetail(this.rental.carId).subscribe(response => {
      this.carDetail = response.data;
      this.paymentCalculator();
      this.dataLoaded = true;
    })
  }

  paymentCalculator() {

    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetail.car.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
      }
    }
  }

  saveCreditCart() {
    this.creditCard = Object.assign({}, this.creditCardAddForm.value)
    this.creditCard.customerId = Number(this.rental.customerId)

    this.creditCardService.add(this.creditCard).subscribe(response => {
      this.toastrService.success(response.message, "BASARILI !");
    }, responseError => {
      this.toastrService.error(responseError.error, "HATA !");
    })
  }

  setCardInfos() {
    this.creditCardAddForm.patchValue({
      cardNumber: this.cardNumber,
      nameOnTheCard: this.nameOnTheCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
    });
  }

  getCardsByCustomer() {
    this.creditCardService.getCardsByUserId(this.authService.getUserId()).subscribe(response => {
      this.creditCards = response.data;
    })
  }

  setCurrentCard(card: CreditCard) {
    this.currentCard = card;
  }

  addRental(rental: Rental) {
    this.rentalService.add(rental).subscribe(response => {
      this.toastrService.success(response.message, "BASARILI !");
    }, responseError => {
      this.toastrService.error(responseError.error,"HATA !")
    });
  }

  pay() {
    if (this.currentCard) {
      this.paymentModel = this.currentCard;
    }
    if (this.creditCardAddForm.valid) {
      this.paymentModel = this.creditCardAddForm.value
    }

    if (this.saveCart == true) {
      this.saveCreditCart()
    }

    this.addRental(this.rental);
  }
}

