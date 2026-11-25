import { useState } from "react";
import {
  getExerciseImageUrl,
  getYoutubeEmbedUrl,
  getYoutubeSearchUrl,
  muscleGroupLabels,
  equipmentLabels,
} from "../../data/exercises";
import { isCustomExercise } from "../../lib/customExercisesStorage";
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
      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-light bg-white px-3 py-2 text-sm font-medium text-accent hover:border-accent"
    >
      {showVideo ? <IconImage size={13} /> : <IconPlay size={13} />}
      {label ?? (showVideo ? "Ver imagen" : "Ver video")}
    </button>
  );
}

function ExerciseImage({
  exercise,
  className = "",
}: {
  exercise: Exercise;
  className?: string;
}) {
  const imageUrl = getExerciseImageUrl(exercise.imagePath);
  if (!imageUrl || isCustomExercise(exercise)) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-mist ${className}`}
        aria-hidden
      >
        <span className="font-display text-4xl text-muted">
          {exercise.name.trim().charAt(0).toUpperCase() || "?"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={exercise.name}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
    />
  );
}

export function ExerciseMedia({
  exercise,
  compact = false,
}: ExerciseMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
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
          className={`overflow-hidden rounded-sm bg-mist ${
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
            <ExerciseImage exercise={exercise} />
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
      <div className="aspect-video overflow-hidden rounded-sm bg-mist">
        {showVideo && canEmbed && videoId ? (
          <iframe
            title={`Demo: ${exercise.name}`}
            src={`${getYoutubeEmbedUrl(videoId)}?rel=0`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <ExerciseImage exercise={exercise} />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-sm bg-mist px-3 py-1 text-primary-2">
          {muscleGroupLabels[exercise.muscleGroup]}
        </span>
        <span className="rounded-sm bg-mist px-3 py-1 text-primary-2">
          {equipmentLabels[exercise.equipment]}
        </span>
        {isCustomExercise(exercise) && (
          <span className="rounded-sm bg-primary-2 px-3 py-1 text-white">
            Personalizado
          </span>
        )}
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
