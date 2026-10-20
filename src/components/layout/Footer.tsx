import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { cafeInfo } from "@/data/cafe-info";

export function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-200 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 카페 정보 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {cafeInfo.name}
            </h3>
            <p className="text-warm-300 text-sm leading-relaxed mb-4">
              {cafeInfo.catchphrase}
            </p>
            <a
              href={cafeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-warm-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
              <span className="text-sm">{cafeInfo.instagramId}</span>
            </a>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div>
                  <span>{cafeInfo.address}</span>
                  <br />
                  <span className="text-warm-400 text-xs">
                    {cafeInfo.addressDetail}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <a
                  href={`tel:${cafeInfo.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {cafeInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* 영업시간 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">영업시간</h3>
            <ul className="space-y-2 text-sm">
              {cafeInfo.businessHours.map((schedule) => (
                <li key={schedule.day} className="flex items-center gap-2">
                  <Clock size={16} className="shrink-0" />
                  <span>
                    {schedule.day}: {schedule.hours}
                  </span>
                </li>
              ))}
              <li className="text-warm-400 text-xs mt-2">
                * {cafeInfo.closedDay}
              </li>
            </ul>
            <p className="text-warm-400 text-xs mt-4">
              {cafeInfo.directions}
            </p>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 text-center text-sm text-warm-500">
          <p>&copy; 2025 {cafeInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
