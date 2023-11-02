export function formatDateLeft(dateString) {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert difference to days

    if (diffDays <= 0) {
        return "Expired";
    } else if (diffDays === 1) {
        return "1 day left";
    } else {
        return `${diffDays} days left`;
    }
}

export function formatDate(dateString) {
    // Format: "DD-MM-YYYY"
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatDateYMD(dateString) {
    // Format: "YYYY-MM-DD"
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }

export function formatDateTime(dateString) {
    // Format: "HH:MM DD-MM-YYYY"
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hour}:${minute} ${day}/${month}/${year} `;
}

export function formatDateISO(dateString) {
    // Format: "YYYY-MM-DDTHH:MM:SS.SSSZ"
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString();
}
