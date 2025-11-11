// 더미 학생 데이터
const studentsData = {
    "김민수": {
        name: "김민수",
        phone: "010-9876-5432",
        parentPhone: "010-1234-5678",
        grade: "중학교 2학년",
        school: "○○중학교",
        birthDate: "2009-03-15",
        address: "서울시 강남구",
        remainingClasses: 12,
        endDate: "2024-12-31",
        currentCourse: "수학 집중반",
        remark: "수학에 관심이 많고 적극적으로 참여함",
        consultations: [
            {
                date: "2024-11-01",
                type: "학습 상담",
                content: "현재 진도에 잘 따라오고 있음. 심화 문제 추가 제공 예정"
            },
            {
                date: "2024-10-15",
                type: "학부모 상담",
                content: "가정에서도 꾸준히 복습하고 있음. 다음 레벨 테스트 준비 중"
            }
        ]
    },
    "이지은": {
        name: "이지은",
        phone: "010-8765-4321",
        parentPhone: "010-2345-6789",
        grade: "고등학교 1학년",
        school: "○○고등학교",
        birthDate: "2008-07-22",
        address: "서울시 서초구",
        remainingClasses: 8,
        endDate: "2024-11-30",
        currentCourse: "영어 회화반",
        remark: "영어 회화 실력 향상을 위해 노력 중",
        consultations: [
            {
                date: "2024-10-28",
                type: "학습 상담",
                content: "회화 실력이 많이 향상됨. 토익 준비반 이동 고려 중"
            }
        ]
    },
    "박준호": {
        name: "박준호",
        phone: "010-7654-3210",
        parentPhone: "010-3456-7890",
        grade: "중학교 3학년",
        school: "○○중학교",
        birthDate: "2008-11-08",
        address: "서울시 송파구",
        remainingClasses: 15,
        endDate: "2025-01-15",
        currentCourse: "과학 실험반",
        remark: "실험에 흥미가 많고 탐구력이 뛰어남",
        consultations: [
            {
                date: "2024-10-20",
                type: "진로 상담",
                content: "이공계 진학 희망. 과학고 진학 상담 진행"
            }
        ]
    },
    "최서연": {
        name: "최서연",
        phone: "010-6543-2109",
        parentPhone: "010-4567-8901",
        grade: "고등학교 2학년",
        school: "○○고등학교",
        birthDate: "2007-05-12",
        address: "서울시 강서구",
        remainingClasses: 6,
        endDate: "2024-12-15",
        currentCourse: "국어 논술반",
        remark: "논리적 사고력이 뛰어나고 글쓰기 실력이 우수함",
        consultations: [
            {
                date: "2024-11-05",
                type: "학습 상담",
                content: "논술 실력이 크게 향상됨. 대학 입시 논술 준비 시작"
            }
        ]
    }
};

let currentStudent = null;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // URL에서 학생 이름 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('name') || '김민수';
    
    currentStudent = studentsData[studentName];
    if (!currentStudent) {
        currentStudent = studentsData['김민수']; // 기본값
    }
    
    renderStudentInfo();
    
    // 오늘 날짜를 기본값으로 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('consultationDate').value = today;
});

// 학생 정보 렌더링
function renderStudentInfo() {
    // 헤더 업데이트
    document.getElementById('studentNameHeader').textContent = currentStudent.name;
    document.title = `${currentStudent.name} - 학생 상세`;
    
    // 기본 정보
    const basicInfo = document.getElementById('basicInfo');
    basicInfo.innerHTML = `
        <div class="info-item">
            <label>학생 이름</label>
            <span>${currentStudent.name}</span>
        </div>
        <div class="info-item">
            <label>학생 연락처</label>
            <span>${currentStudent.phone}</span>
        </div>
        <div class="info-item">
            <label>보호자 연락처</label>
            <span>${currentStudent.parentPhone}</span>
        </div>
        <div class="info-item">
            <label>학년</label>
            <span>${currentStudent.grade}</span>
        </div>
        <div class="info-item">
            <label>학교</label>
            <span>${currentStudent.school}</span>
        </div>
        <div class="info-item">
            <label>생년월일</label>
            <span>${currentStudent.birthDate}</span>
        </div>
        <div class="info-item">
            <label>주소</label>
            <span>${currentStudent.address}</span>
        </div>
        <div class="info-item">
            <label>비고</label>
            <span>${currentStudent.remark}</span>
        </div>
    `;
    
    // 수업 정보
    const classInfo = document.getElementById('classInfo');
    classInfo.innerHTML = `
        <div class="info-item">
            <label>진행중인 수업</label>
            <span>${currentStudent.currentCourse}</span>
        </div>
        <div class="info-item">
            <label>잔여 횟수</label>
            <span>${currentStudent.remainingClasses}회</span>
        </div>
        <div class="info-item">
            <label>수업 종료일</label>
            <span>${currentStudent.endDate}</span>
        </div>
        <div class="info-item">
            <label>수강 상태</label>
            <span class="status-badge status-present">진행중</span>
        </div>
    `;
    
    // 상담 이력
    renderConsultationHistory();
}

// 상담 이력 렌더링
function renderConsultationHistory() {
    const consultationHistory = document.getElementById('consultationHistory');
    
    if (currentStudent.consultations.length === 0) {
        consultationHistory.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">상담 이력이 없습니다.</p>';
        return;
    }
    
    consultationHistory.innerHTML = currentStudent.consultations
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(consultation => `
            <div class="consultation-item">
                <div class="consultation-date">${consultation.date}</div>
                <div class="consultation-type">${consultation.type}</div>
                <div class="consultation-content">${consultation.content}</div>
            </div>
        `).join('');
}

// 상담 이력 추가 모달 표시
function showAddConsultationModal() {
    document.getElementById('consultationModal').style.display = 'block';
}

// 상담 이력 추가 모달 닫기
function closeConsultationModal() {
    document.getElementById('consultationModal').style.display = 'none';
    document.getElementById('consultationForm').reset();
    
    // 오늘 날짜를 다시 기본값으로 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('consultationDate').value = today;
}

// 상담 이력 추가 폼 제출
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const newConsultation = {
        date: formData.get('consultationDate'),
        type: formData.get('consultationType'),
        content: formData.get('consultationContent')
    };
    
    // 상담 이력 추가
    currentStudent.consultations.push(newConsultation);
    
    // 화면 업데이트
    renderConsultationHistory();
    
    // 모달 닫기
    closeConsultationModal();
    
    // 성공 메시지
    alert('상담 이력이 저장되었습니다.');
});

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('consultationModal');
    if (event.target === modal) {
        closeConsultationModal();
    }
}
