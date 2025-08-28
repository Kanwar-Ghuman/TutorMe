"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Chip, Skeleton } from "@nextui-org/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WeeklyTutorCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    fetchCalendarData();
  }, [currentWeek]);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const startDate = getWeekStart();
      const endDate = getWeekEnd();

      const response = await fetch(
        `/api/teacher/calendar?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );

      if (response.ok) {
        const data = await response.json();
        setTutors(data.tutors || []);
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeekStart = () => {
    const date = new Date(currentWeek);
    const day = date.getDay();
    const diff = date.getDate() - day; // Sunday is 0
    return new Date(date.setDate(diff));
  };

  const getWeekEnd = () => {
    const start = getWeekStart();
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const getWeekDays = () => {
    const days = [];
    const start = getWeekStart();

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const goldBlockDays = ["monday", "tuesday", "friday"];
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const isGoldBlockDay = (date) => {
    const dayName = dayNames[date.getDay()];
    return goldBlockDays.includes(dayName);
  };

  const getTutorsForDay = (date) => {
    const dayName = dayNames[date.getDay()];

    return tutors.filter((tutor) => {
      // Check if tutor is available on this gold block day
      return tutor.goldBlockDays && tutor.goldBlockDays.includes(dayName);
    });
  };

  const getSessionsForTutorAndDay = (tutorId, date) => {
    const tutor = tutors.find((t) => t.id === tutorId);
    if (!tutor) return [];

    const dateStr = date.toISOString().split("T")[0];
    const dayName = dayNames[date.getDay()];

    return tutor.sessions.filter((session) => {
      const sessionDateStr = session.date.split("T")[0];
      return sessionDateStr === dateStr && session.goldBlockDay === dayName;
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Weekly Tutor Schedule</h2>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardBody>
            <Skeleton className="w-full h-96 rounded-lg" />
          </CardBody>
        )}
      </Card>
    );
  }

  const weekDays = getWeekDays();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Weekly Tutor Schedule</h2>
          </div>

          <div className="flex items-center gap-4">
            {isExpanded && (
              <>
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <h3 className="text-lg font-medium min-w-[200px] text-center">
                  Week of{" "}
                  {getWeekStart().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>

                <button
                  onClick={() => navigateWeek(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </CardHeader>

      {!isExpanded && (
        <CardBody className="py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {tutors.length}
              </div>
              <div className="text-xs text-gray-600">Tutors</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {tutors.reduce((acc, tutor) => acc + tutor.sessions.length, 0)}
              </div>
              <div className="text-xs text-gray-600">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {tutors.reduce(
                  (acc, tutor) =>
                    acc +
                    tutor.sessions.filter((s) => s.status === "SCHEDULED")
                      .length,
                  0
                )}
              </div>
              <div className="text-xs text-gray-600">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                {
                  tutors.filter(
                    (tutor) =>
                      tutor.goldBlockDays && tutor.goldBlockDays.length > 0
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
          </div>
        </CardBody>
      )}

      {isExpanded && (
        <CardBody className="p-6">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {weekDays.map((date, index) => {
              const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                index
              ];
              const isToday = date.toDateString() === new Date().toDateString();
              const isGoldBlock = isGoldBlockDay(date);

              return (
                <div
                  key={index}
                  className={cn(
                    "p-3 text-center border-b-2 mb-2",
                    isToday && "border-blue-500",
                    isGoldBlock && "bg-yellow-50",
                    !isGoldBlock && "bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "font-semibold text-sm",
                      isToday && "text-blue-600"
                    )}
                  >
                    {dayName}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      isToday && "text-blue-600",
                      !isToday && "text-gray-600"
                    )}
                  >
                    {formatDate(date)}
                  </div>
                  {isGoldBlock && (
                    <Chip
                      size="sm"
                      color="warning"
                      variant="flat"
                      className="mt-1"
                    >
                      Gold Block
                    </Chip>
                  )}
                </div>
              );
            })}

            {/* Calendar Content */}
            {weekDays.map((date, dayIndex) => {
              const isGoldBlock = isGoldBlockDay(date);
              const availableTutors = getTutorsForDay(date);

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    "min-h-[400px] p-3 border border-gray-200 rounded-lg",
                    isGoldBlock ? "bg-yellow-50/30" : "bg-gray-50/30"
                  )}
                >
                  {!isGoldBlock ? (
                    <div className="text-center text-gray-500 py-8">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tutoring today</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {availableTutors.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                          <Users className="w-6 h-6 mx-auto mb-2 opacity-50" />
                          <p className="text-xs">No tutors available</p>
                        </div>
                      ) : (
                        availableTutors.map((tutor) => {
                          const sessions = getSessionsForTutorAndDay(
                            tutor.id,
                            date
                          );

                          return (
                            <Card
                              key={tutor.id}
                              className="bg-white shadow-sm border border-gray-200"
                            >
                              <CardBody className="p-3">
                                {/* Tutor Header */}
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-xs font-semibold text-blue-700">
                                        {tutor.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900">
                                        {tutor.name}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {tutor.subjects
                                          .slice(0, 2)
                                          .map((subject, idx) => (
                                            <Chip
                                              key={idx}
                                              size="sm"
                                              variant="flat"
                                              color="primary"
                                              className="text-xs"
                                            >
                                              {subject}
                                            </Chip>
                                          ))}
                                        {tutor.subjects.length > 2 && (
                                          <span className="text-xs text-gray-500">
                                            +{tutor.subjects.length - 2}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-xs text-gray-500">
                                      Sessions
                                    </p>
                                    <p className="text-sm font-semibold">
                                      {sessions.length}
                                    </p>
                                  </div>
                                </div>

                                {/* Sessions */}
                                {sessions.length === 0 ? (
                                  <div className="text-center py-2 text-gray-500">
                                    <Clock className="w-4 h-4 mx-auto mb-1 opacity-50" />
                                    <p className="text-xs">Available</p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {sessions.map((session, idx) => (
                                      <div
                                        key={idx}
                                        className={cn(
                                          "p-2 rounded border text-xs",
                                          getStatusColor(session.status)
                                        )}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="font-medium">
                                              {session.studentName}
                                            </p>
                                            <p className="opacity-75">
                                              {session.subject}
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-xs opacity-75">
                                              {session.location ||
                                                "Gold Block Room"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardBody>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {tutors.length}
              </div>
              <div className="text-sm text-gray-600">Total Tutors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {tutors.reduce((acc, tutor) => acc + tutor.sessions.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {tutors.reduce(
                  (acc, tutor) =>
                    acc +
                    tutor.sessions.filter((s) => s.status === "SCHEDULED")
                      .length,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {
                  tutors.filter(
                    (tutor) =>
                      tutor.goldBlockDays && tutor.goldBlockDays.length > 0
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Available Tutors</div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default WeeklyTutorCalendar;
