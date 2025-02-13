const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiSFI5WXdTMUVmdVpreE54anExQ05udjFVN0JIZk1aV01mbTZTZ1VpUk56cFEiLCJyb2xlcyI6WyJ1c2VyIl0sImdyb3VwIjoidGVzdCIsImVyYSI6IkZFQVRVUkVEdjEuNyIsImVyYXMiOlt7ImVyYSI6IkZFQVRVUkVEdjEuNyIsImdyb3VwIjoidGVzdCIsInRwYyI6NTB9LHsiZXJhIjoiVFJFTkRJTkdfQ0FST1VTRUx2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjowfSx7ImVyYSI6IldBVENITElTVHYxLjAiLCJncm91cCI6InRlc3QiLCJ0cGMiOjEwMH0seyJlcmEiOiJTRU1BTlRJQ19TRUFSQ0h2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjowfSx7ImVyYSI6IlNJTUlMQVJfQ09JTlN2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjowfSx7ImVyYSI6IkNPSU5fUkVDU19GUk9NX1RSQURFX0hJU1RPUll2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjowfSx7ImVyYSI6IlRSQURFX0JPWF9QT1NJVElPTl9WQUxVRXYxLjAiLCJncm91cCI6ImNvbnRyb2wiLCJ0cGMiOjB9LHsiZXJhIjoiU0VBUkNIX1NPUlRfQUJ2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjowfSx7ImVyYSI6IlJFQ19TRVNTSU9OX0xPR0dJTkd2MS4wIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjoxMH0seyJlcmEiOiJNVUxUSV9DT0xVTU5fQURWQU5DRUR2MS4xIiwiZ3JvdXAiOiJjb250cm9sIiwidHBjIjo1MH0seyJlcmEiOiJIWUJSSURfU0VBUkNIdjEuMCIsImdyb3VwIjoiY29udHJvbCIsInRwYyI6NTB9LHsiZXJhIjoiRk9SQ0VfTE9HT1VUdjEuMCIsImdyb3VwIjoiY29udHJvbCIsInRwYyI6MH0seyJlcmEiOiJUT1BfUlVOTkVSU3YxLjAiLCJncm91cCI6ImNvbnRyb2wiLCJ0cGMiOjB9XSwiaWF0IjoxNzM5NDczNDAzLCJleHAiOjE3NDIwNjU0MDN9.XU3wtCjQjt4zCz2UjGabVaaneLg6jaqXIcvyRmfhIXg";

const url = "https://frontend-api-v3.pump.fun/token/generateTokenForThread";

async function generateToken() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `auth_token=${authToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Token gegenereerd:", data.token);
  } catch (error) {
    console.error("Fout bij het genereren van de token:", error);
  }
}

generateToken();
