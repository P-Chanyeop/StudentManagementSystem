// 더미 출석 데이터
let attendanceData = [
    {
        id: 1,
        name: "김민수",
        classTime: "14:00-15:30",
        arrivalTime: "14:05",
        departureTime: "",
        attended: true,
        parentPhone: "010-1234-5678",
        remainingClasses: 12,
        endDate: "2024-12-31",
        remark: "수학 집중반",
        progress: 45 // 수업 진행률 (%)
    },
    {
        id: 2,
        name: "이지은",
        classTime: "15:00-16:30",
        arrivalTime: "15:02",
        departureTime: "16:25",
        attended: true,
        parentPhone: "010-2345-6789",
        remainingClasses: 8,
        endDate: "2024-11-30",
        remark: "영어 회화반",
        progress: 100
    },
    {
        id: 3,
        name: "박준호",
        classTime: "16:00-17:30",
        arrivalTime: "",
        departureTime: "",
        attended: false,
        parentPhone: "010-3456-7890",
        remainingClasses: 15,
        endDate: "2025-01-15",
        remark: "과학 실험반",
        progress: 0
    },
    {
        id: 4,
        name: "최서연",
        classTime: "17:00-18:30",
        arrivalTime: "16:58",
        departureTime: "",
        attended: true,
        parentPhone: "010-4567-8901",
        remainingClasses: 6,
        endDate: "2024-12-15",
        remark: "국어 논술반",
        progress: 30
    }
];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    renderAttendanceTable();
    updateAttendanceStats();
});

// 현재 날짜 업데이트
function updateCurrentDate() {
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'short' 
    };
    const dateStr = today.toLocaleDateString('ko-KR', options);
    document.getElementById('currentDate').textContent = dateStr;
}

// 출석부 테이블 렌더링
function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';
    
    attendanceData.forEach(student => {
        const row = document.createElement('tr');
        
        // 출석 상태에 따른 스타일
        if (student.attended) {
            row.style.backgroundColor = '#F1F8E9';
        }
        
        row.innerHTML = `
            <td>
                <span class="student-name" onclick="goToStudentDetail('${student.name}')">
                    ${student.name}
                </span>
            </td>
            <td>
                ${student.classTime}
                <div class="progress-bar" style="margin-top: 5px;">
                    <div class="progress-fill" style="width: ${student.progress}%"></div>
                </div>
                <small style="color: #666;">${student.progress}% 진행</small>
            </td>
            <td>${student.arrivalTime || '-'}</td>
            <td>${student.departureTime || '-'}</td>
            <td>
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" ${student.attended ? 'checked' : ''} 
                           onchange="toggleAttendance(${student.id})" 
                           style="margin-right: 8px;">
                    <span class="status-badge ${student.attended ? 'status-present' : 'status-absent'}">
                        ${student.attended ? '출석' : '결석'}
                    </span>
                </label>
            </td>
            <td>${student.remark}</td>
            <td>
                <button class="more-btn" onclick="showStudentModal(${student.id})">
                    ⋯
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// 출석 통계 업데이트
function updateAttendanceStats() {
    const totalStudents = attendanceData.length;
    const presentStudents = attendanceData.filter(s => s.attended).length;
    const attendanceRate = Math.round((presentStudents / totalStudents) * 100);
    
    document.getElementById('attendanceRate').textContent = `${attendanceRate}%`;
    document.getElementById('attendanceProgress').style.width = `${attendanceRate}%`;
    
    const statsText = document.querySelector('.progress-bar + p');
    statsText.innerHTML = `출석률: <span id="attendanceRate">${attendanceRate}%</span> (${totalStudents}명 중 ${presentStudents}명 출석)`;
}

// 출석 체크 토글
function toggleAttendance(studentId) {
    const student = attendanceData.find(s => s.id === studentId);
    if (student) {
        student.attended = !student.attended;
        
        // 출석 체크 시 등원 시간 자동 설정
        if (student.attended && !student.arrivalTime) {
            const now = new Date();
            student.arrivalTime = now.toTimeString().slice(0, 5);
        }
        
        renderAttendanceTable();
        updateAttendanceStats();
    }
}

// 등원순 정렬
function sortByArrival() {
    attendanceData.sort((a, b) => {
        if (!a.arrivalTime && !b.arrivalTime) return 0;
        if (!a.arrivalTime) return 1;
        if (!b.arrivalTime) return -1;
        return a.arrivalTime.localeCompare(b.arrivalTime);
    });
    renderAttendanceTable();
}

// 하원순 정렬
function sortByDeparture() {
    attendanceData.sort((a, b) => {
        if (!a.departureTime && !b.departureTime) return 0;
        if (!a.departureTime) return 1;
        if (!b.departureTime) return -1;
        return a.departureTime.localeCompare(b.departureTime);
    });
    renderAttendanceTable();
}

// 학생 상세 페이지로 이동
function goToStudentDetail(studentName) {
    location.href = `student-detail.html?name=${encodeURIComponent(studentName)}`;
}

// 학생 상세 정보 모달 표시
function showStudentModal(studentId) {
    const student = attendanceData.find(s => s.id === studentId);
    if (!student) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="info-grid">
            <div class="info-item">
                <label>학부모 연락처</label>
                <span>${student.parentPhone}</span>
            </div>
            <div class="info-item">
                <label>잔여 횟수</label>
                <span>${student.remainingClasses}회</span>
            </div>
            <div class="info-item">
                <label>수강 종료일</label>
                <span>${student.endDate}</span>
            </div>
            <div class="info-item">
                <label>메모</label>
                <span>${student.remark}</span>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <button class="btn" onclick="goToStudentDetail('${student.name}')">
                상세 페이지로 이동
            </button>
        </div>
    `;
    
    document.getElementById('studentModal').style.display = 'block';
}

// 모달 닫기
function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('studentModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
