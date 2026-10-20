export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}
