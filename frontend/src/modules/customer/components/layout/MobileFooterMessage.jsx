import React, { useEffect, useState } from 'react';
import { useSettings } from '@core/context/SettingsContext';
import { customerApi } from '../../services/customerApi';

const MobileFooterMessage = () => {
    const { settings } = useSettings();
    const appName = settings?.appName || 'App';
    const [footerUrl, setFooterUrl] = useState("");

    useEffect(() => {
        customerApi.getHeroConfig({ pageType: "home" })
            .then(res => {
                const url = res.data?.result?.mobileFooterUrl || res.data?.mobileFooterUrl || "";
                setFooterUrl(url);
            })
            .catch(() => {});
    }, []);

    const isVideo = (url) => {
        if (!url) return false;
        return (
            url.includes("/video/upload/") ||
            /\.(mp4|webm|ogg|mov|m4v)($|\?)/i.test(url)
        );
    };

    if (footerUrl) {
        return (
            <div className="md:hidden w-full pb-28 pt-2 bg-transparent">
                <div className="w-full overflow-hidden shadow-md border-y border-slate-100/50 bg-white aspect-[21/9]">
                    {isVideo(footerUrl) ? (
                        <video
                            src={footerUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <img
                            src={footerUrl}
                            alt="Mobile Application Footer"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="md:hidden w-full flex flex-col items-center -mt-8 pt-0 pb-28 px-6 bg-transparent">
            <div className="w-full flex flex-col">
                <h2 className="text-[38px] leading-[1.1] font-black text-slate-300 tracking-tight text-left">
                    India's last<br />minute app <span className="text-red-500">❤️</span>
                </h2>

                <div className="w-full h-[1px] bg-slate-200 mt-6 mb-4"></div>

                <div className="text-slate-300 font-black text-2xl tracking-tighter text-left">
                    {appName}
                </div>
            </div>
        </div>
    );
};

export default MobileFooterMessage;
