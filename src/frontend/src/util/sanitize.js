export const clean = (str) => {
  //approach sekarang,
  //ubah jadi uppercase
  str = str.toUpperCase();
  //hilangkan semua karater selain ATGC
  str = str.replace(/[^ATGC]/g, "");
  return str;
};

export const canBeCleaned = (str) => {
  //incase kalo approachnya ganti, mungkin fungsi ini bakal ada isinya
  return true;
};
