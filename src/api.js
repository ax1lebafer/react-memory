const host = "https://wedev-api.sky.pro/api/v2/leaderboard";

export async function getLeaders() {
  const response = await fetch(host, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  return data;
}

export async function postLeader({ name, time, achievements }) {
  const response = await fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      time: time,
      achievements: achievements,
    }),
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  return data;
}
