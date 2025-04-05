"use client";
import { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import SimplePeer from 'simple-peer';
import { BaseAddress } from '@/types/api';
import { useClient } from '@/contexts/profile-management/client-context';
import { useSignalR } from '@/contexts/profile-management/signalR-context';

interface VideoCallProps {
    callerId: string;
    signalData?: string | null;
}

const VideoCall: React.FC<VideoCallProps> = ({callerId,signalData}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
    const {connection} = useSignalR()


    useEffect(()=>{
       
        if(callerId && signalData){
            const p = new SimplePeer({ initiator: false, trickle: false });

            p.on("signal", (data) => {
                // Send the answer back to the initiator
                if (connection) {
                    connection.invoke("SendSignal", callerId, JSON.stringify(data)); // Replace "initiatorUser Id" with the actual ID of the peer who initiated the call
                }
            });
    
            p.on("stream", (stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            });
    
            p.signal(signalData);
            setPeer(p);
    
            // Get user media
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    p.addStream(stream);
                })
                .catch((error) => {
                    console.error("Error accessing media devices.", error);
                });
        }
    },[])

    const createOffer = () => {
        const p = new SimplePeer({ initiator: true, trickle: false });

        p.on("signal", (data) => {
            // Send the offer to the target peer via SignalR
            if (connection) {
                connection.invoke("SendSignal", "targetUser Id", JSON.stringify(data)); // Replace "targetUser Id" with the actual ID of the peer you want to connect to
            }
        });

        p.on("stream", (stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        });

        setPeer(p);

        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                p.addStream(stream);
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
    };

    const handleAnswer = (signal: string) => {
        const p = new SimplePeer({ initiator: false, trickle: false });

        p.on("signal", (data) => {
            // Send the answer back to the initiator
            if (connection) {
                connection.invoke("SendSignal", "initiatorUser Id", JSON.stringify(data)); // Replace "initiatorUser Id" with the actual ID of the peer who initiated the call
            }
        });

        p.on("stream", (stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        });

        setPeer(p);

        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                p.addStream(stream);
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
        
    };

    return (
        <div>
            <button onClick={createOffer}>Start Call</button>
            <video ref={videoRef} autoPlay>
                <track
                    kind="captions"
                    srcLang="en"
                    src="path/to/captions.vtt" // Replace with the actual path to your captions file
                    label="English"
                />
            </video>
        </div>
    );
};

export default VideoCall;