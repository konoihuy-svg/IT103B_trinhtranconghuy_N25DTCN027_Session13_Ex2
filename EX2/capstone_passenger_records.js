let passengers = [
    { pnrCode: "PNR001", passengerName: "Nguyen Van A", idNumber: "012345678901", flightNumber: "VN200", seatNumber: null, isCheckedIn: false },
    { pnrCode: "PNR002", passengerName: "Tran Thi B", idNumber: "C1234567", flightNumber: "VN200", seatNumber: "12A", isCheckedIn: true },
    { pnrCode: "PNR003", passengerName: "Le Van C", idNumber: "098765432109", flightNumber: "VJ300", seatNumber: null, isCheckedIn: false }
];

const SEAT_POOL = ["12A", "12B", "12C", "14A", "14B", "14C", "15A", "15B", "15C"];

function validateIDNumber(id) {
    const cccdRegex = /^\d{12}$/;
    const passportRegex = /^[A-Za-z]\d{7,8}$/;
    return cccdRegex.test(id) || passportRegex.test(id);
}

function assignSeat(flightNumber) {
    let takenSeats = passengers
        .filter(p => p.flightNumber === flightNumber && p.seatNumber !== null)
        .map(p => p.seatNumber);
    
    for (let seat of SEAT_POOL) {
        if (!takenSeats.includes(seat)) {
            return seat;
        }
    }
    return null; 
}

function listPassengers() {
    console.log("\n--- DANH SACH HO SO HANH KHACH ---");
    if (passengers.length === 0) {
        console.log("Hien chua co ho so nao.");
    } else {
        console.table(passengers);
    }
}

// Hàm tiếp nhận hồ sơ mới
function addPassengerRecord() {
    console.log("\n--- TIEP NHAN HO SO MOI ---");
    let pnr = prompt("Nhap ma dat cho (PNR):");
    if (!pnr) return;
    
    if (passengers.some(p => p.pnrCode.toUpperCase() === pnr.toUpperCase())) {
        console.log("=> Ma PNR da ton tai trong he thong!");
        return;
    }

    let name = prompt("Nhap ten hanh khach:");
    let idNum = prompt("Nhap so CCCD (12 so) hoac Ho chieu (1 chu + 7/8 so):");
    
    if (!validateIDNumber(idNum)) {
        console.log("=> LOI: Dinh dang CCCD hoac Ho chieu khong hop le!");
        return;
    }

    let flight = prompt("Nhap ma chuyen bay (VD: VN200):");

    passengers.push({
        pnrCode: pnr.toUpperCase(),
        passengerName: name.toUpperCase(),
        idNumber: idNum.toUpperCase(),
        flightNumber: flight.toUpperCase(),
        seatNumber: null,
        isCheckedIn: false
    });
    console.log(`=> Da tao thanh cong ho so cho hanh khach ${name.toUpperCase()}!`);
}

function printBoardingPass(passenger) {
    console.log("\n========================================");
    console.log("            BOARDING PASS               ");
    console.log("========================================");
    console.log(` Hanh khach : ${passenger.passengerName}`);
    console.log(` Chuyen bay : ${passenger.flightNumber}`);
    console.log(` PNR / Ghe  : ${passenger.pnrCode} / ${passenger.seatNumber}`);
    console.log(` Giay to    : ${passenger.idNumber}`);
    console.log("----------------------------------------");
    console.log(" BARCODE    : ||| || ||| | || |||| | || ");
    console.log("========================================\n");
}

function checkInPassenger() {
    console.log("\n--- THU TUC CHECK-IN & AN NINH ---");
    let pnr = prompt("Nhap ma dat cho (PNR) can check-in:");
    if (!pnr) return;

    let passenger = passengers.find(p => p.pnrCode.toUpperCase() === pnr.toUpperCase());

    if (!passenger) {
        console.log("=> Khong tim thay ho so voi ma PNR nay!");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log(`=> Hanh khach da duoc check-in truoc do (Ghe: ${passenger.seatNumber}).`);
        return;
    }

    console.log(`Dang kiem tra an ninh ho so: ${passenger.passengerName} - ${passenger.idNumber}...`);
    if (!validateIDNumber(passenger.idNumber)) {
        console.log("=> CANH BAO AN NINH: Giay to tuy than khong hop le. Tu choi check-in!");
        return;
    }

    let assignedSeat = assignSeat(passenger.flightNumber);
    if (!assignedSeat) {
        console.log("=> LOI: Chuyen bay da het ghe trong hoac gap su co he thong!");
        return;
    }

    passenger.seatNumber = assignedSeat;
    passenger.isCheckedIn = true;

    console.log("=> Check-in thanh cong! Dang in the len may bay...");
    printBoardingPass(passenger);
}

function main() {
    let menuChoice;
    do {
        console.log("\n===== HE THONG AN NINH & CHECK-IN SAN BAY =====");
        console.log("1. Xem danh sach ho so hanh khach");
        console.log("2. Tiep nhan ho so hanh khach moi");
        console.log("3. Kiem tra an ninh, Check-in & In the len may bay");
        console.log("4. Thoat chuong trinh");
        
        menuChoice = prompt("Nhap lua chon menu (1-4): ");

        switch (menuChoice) {
            case "1":
                listPassengers();
                break;
            case "2":
                addPassengerRecord();
                break;
            case "3":
                checkInPassenger();
                break;
            case "4":
                console.log("=> He thong dong. Chao tam biet!");
                break;
            default:
                console.log("=> Lua chon khong hop le. Vui long chon tu 1-4.");
        }
    } while (menuChoice !== "4");
}

main();