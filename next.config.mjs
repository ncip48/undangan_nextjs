/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/siswa",
        destination: "/dashboard/siswa",
      },
      {
        source: "/report",
        destination: "/dashboard/report",
      },
      {
        source: "/report-absen",
        destination: "/dashboard/report/absen",
      },
      {
        source: "/report-siswa",
        destination: "/dashboard/report/siswa",
      },
      {
        source: "/report-kelas",
        destination: "/dashboard/report/kelas",
      },
      {
        source: "/akun",
        destination: "/dashboard/akun",
      },
    ];
  },
};

export default nextConfig;
