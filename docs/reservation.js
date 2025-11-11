// 캘린더 생성
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // 요일 헤더
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.background = '#F1F8E9';
        dayHeader.style.color = '#2E7D32';
        calendar.appendChild(dayHeader);
    });
    
    // 이번 달 첫째 날과 마지막 날
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // 캘린더 날짜 생성
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();
        
        // 이번 달이 아닌 날짜는 흐리게
        if (date.getMonth() !== currentMonth) {
            dayElement.style.opacity = '0.3';
            dayElement.style.cursor = 'not-allowed';
        } else if (date < today) {
            // 과거 날짜는 선택 불가
            dayElement.style.opacity = '0.5';
            dayElement.style.cursor = 'not-allowed';
        } else {
            // 선택 가능한 날짜
            dayElement.addEventListener('click', () => selectDate(dayElement, date));
        }
        
        calendar.appendChild(dayElement);
    }
}

let selectedDate = null;
let selectedTime = null;

function selectDate(element, date) {
    // 이전 선택 해제
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // 새로운 선택
    element.classList.add('selected');
    selectedDate = date;
}

// 시간 선택
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    
    // 시간 슬롯 선택
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            // 이전 선택 해제
            document.querySelectorAll('.time-slot.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 새로운 선택
            this.classList.add('selected');
            selectedTime = this.dataset.time;
        });
    });
    
    // 폼 제출
    document.getElementById('reservationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedDate || !selectedTime) {
            alert('날짜와 시간을 선택해주세요.');
            return;
        }
        
        const formData = new FormData(this);
        const motherName = formData.get('motherName');
        const studentName = formData.get('studentName');
        
        if (!motherName || !studentName) {
            alert('필수 정보를 입력해주세요.');
            return;
        }
        
        // 예약 완료 메시지
        const successMessage = document.getElementById('success-message');
        const dateStr = selectedDate.toLocaleDateString('ko-KR');
        successMessage.innerHTML = `
            <strong>${studentName}</strong>님의 수업이 예약되었습니다.<br>
            📅 날짜: ${dateStr}<br>
            🕐 시간: ${selectedTime}<br>
            👤 예약자: ${motherName}
        `;
        successMessage.style.display = 'block';
        
        // 폼 초기화
        this.reset();
        selectedDate = null;
        selectedTime = null;
        document.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // 상단으로 스크롤
        successMessage.scrollIntoView({ behavior: 'smooth' });
    });
});

// 전화번호 자동 포맷팅
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length >= 8) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    input.value = value;
}

document.getElementById('motherPhone').addEventListener('input', function() {
    formatPhoneNumber(this);
});

document.getElementById('studentPhone').addEventListener('input', function() {
    formatPhoneNumber(this);
});
