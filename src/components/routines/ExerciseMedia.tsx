import { useState } from "react";
import {
  getExerciseImageUrl,
  getYoutubeEmbedUrl,
  getYoutubeSearchUrl,
  muscleGroupLabels,
  equipmentLabels,
} from "../../data/exercises";
import type { Exercise } from "../../types/routines";
import { IconImage, IconPlay } from "./RoutineIcons";

interface ExerciseMediaProps {
  exercise: Exercise;
  compact?: boolean;
}

function VideoToggleButton({
  showVideo,
  onClick,
  label,
}: {
  showVideo: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-400/40 px-3 py-1 text-xs text-blue-300 transition-colors hover:border-blue-300 hover:text-white"
    >
      {showVideo ? <IconImage size={13} /> : <IconPlay size={13} />}
      {label ?? (showVideo ? "Ver imagen" : "Ver video")}
    </button>
  );
}

export function ExerciseMedia({
  exercise,
  compact = false,
}: ExerciseMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
  const imageUrl = getExerciseImageUrl(exercise.imagePath);
  const videoId = exercise.youtubeVideoId?.trim() || null;
  const canEmbed = Boolean(videoId);

  const openSearch = () => {
    window.open(getYoutubeSearchUrl(exercise.nameEn), "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div
        className={`flex shrink-0 flex-col gap-2 ${
          showVideo && canEmbed ? "w-full max-w-sm sm:w-64" : "w-[7.5rem] sm:w-36"
        }`}
      >
        <div
          className={`overflow-hidden rounded-lg bg-primary-2/40 ${
            showVideo && canEmbed ? "aspect-video" : "aspect-square"
          }`}
        >
          {showVideo && canEmbed && videoId ? (
            <iframe
              title={`Demo: ${exercise.name}`}
              src={`${getYoutubeEmbedUrl(videoId)}?rel=0`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={imageUrl}
              alt={exercise.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        {canEmbed ? (
          <VideoToggleButton
            showVideo={showVideo}
            onClick={() => setShowVideo((v) => !v)}
          />
        ) : (
          <VideoToggleButton
            showVideo={false}
            onClick={openSearch}
            label="Buscar video"
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-lg bg-primary-2/40">
        {showVideo && canEmbed && videoId ? (
          <iframe
            title={`Demo: ${exercise.name}`}
            src={`${getYoutubeEmbedUrl(videoId)}?rel=0`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={imageUrl}
            alt={exercise.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">
          {muscleGroupLabels[exercise.muscleGroup]}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">
          {equipmentLabels[exercise.equipment]}
        </span>
        {canEmbed ? (
          <VideoToggleButton
            showVideo={showVideo}
            onClick={() => setShowVideo((v) => !v)}
          />
        ) : (
          <VideoToggleButton
            showVideo={false}
            onClick={openSearch}
            label="Buscar video"
          />
        )}
      </div>
    </div>
  );
}
