// יצירת משתנים לפי האלמנטים שבטופס
const heroNameInput = document.getElementById("heroName");
const classRadios = document.querySelectorAll('input[name="heroClass"]');
const gearCheckboxes = document.querySelectorAll(".gear-checkbox");
const submitBtn = document.getElementById("submitBtn");

// האזנה לאירועי הקלדה ושינוי בשם
heroNameInput.addEventListener("input", checkFormValidity);

// האזנה לרדיו 
for (let i = 0; i < classRadios.length; i++) {
    classRadios[i].addEventListener("click", BaseRadioClick);
}

// האזנה לצ'קבוקסים 
for (let i = 0; i < gearCheckboxes.length; i++) {
    gearCheckboxes[i].addEventListener("change", BaseCheckBoxClick);
}

// פונקציה שקוראת לשתי פונקציות על מנת לבצע האזנה תקינה לרדיו
function BaseRadioClick() {
    handleRadioSelection();
    checkFormValidity();
}

// פונקציה שקוראת לשתי פונקציות על מנת לבצע האזנה תקינה לצ'קבוקס
function BaseCheckBoxClick() {
    handleCheckboxSelection();
    checkFormValidity();
}

// מעבר על הרדיו- שמירת רדיו נבחר ושינוי שקיפות לפי הצורך
function handleRadioSelection() {
    for (let i = 0; i < classRadios.length; i++) {
        const radio = classRadios[i];
        const targetImg = document.getElementById(`img-${radio.value}`);
        if (targetImg) {
            if (radio.checked) {
                targetImg.style.opacity = "1"; // שקיפות מלאה
            } else {
                targetImg.style.opacity = "0"; // חצי שקיפות
            }
        }
    }
}
// מעבר על הצקבוקסים- שמירת צקבוקס נבחר ושינוי שקיפות לפי הצורך
function handleCheckboxSelection() {
    for (let i = 0; i < gearCheckboxes.length; i++) {
        const checkbox = gearCheckboxes[i];
        const targetImg = document.getElementById(`img-${checkbox.value}`);
        if (targetImg) {
            if (checkbox.checked) {
                targetImg.style.opacity = "1"; // שקיפות מלאה
            } else {
                targetImg.style.opacity = "0.5"; // חצי שקיפות
            }
        }
    }
}

// פונקציה לבדיקת תקינות הטופס ושחרור כפתור האישור
function checkFormValidity() {
    const isNameFilled = heroNameInput.value !== "";

    // בדיקה האם רדיו כלשהו מסומן 
    let isRadioSelected = false;
    for (let i = 0; i < classRadios.length; i++) {
        if (classRadios[i].checked) {
            isRadioSelected = true;
            break;
        }
    }

    // שחרור או חסימת הכפתור בהתאם לתנאים
    if (isNameFilled && isRadioSelected) {
        submitBtn.removeAttribute("disabled");
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.setAttribute("disabled", "true");
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
    }
}

// טיפול בלחיצה על כפתור השליחה והצגת הודעת הסיכום
submitBtn.addEventListener("click", function() {
    const name = heroNameInput.value;
    let selectedClass = "";
    let selectedGear = [];

    // מציאת הטקסט של המקצוע שנבחר 
    for (let i = 0; i < classRadios.length; i++) {
        if (classRadios[i].checked) {
            selectedClass = classRadios[i].value;
        }
    }

    //שמירת ציוד נבחר בצקבוקסים במערך
    for (let i = 0; i < gearCheckboxes.length; i++) {
        if (gearCheckboxes[i].checked) {
            selectedGear[selectedGear.length] = gearCheckboxes[i].value;
        }
    }
    // חיבור ציוד נבחר למשתנה אחד מסוג מחרוזת
    let gearSummary;
    if (selectedGear.length > 0) {
        gearSummary = selectedGear.join(", ");
    } else {
        gearSummary = "ללא ציוד נלווה";
    }
    //יצירת והדפסת הודעת אישור יצירת הדמות
    const message = `אישור יצירת דמות!\n\n` + `שם הגיבור: ` + name + `\n` + `מקצוע נבחר: ` + selectedClass + `\n` + `ציוד נלווה: ` + gearSummary;
    alert(message);
});
