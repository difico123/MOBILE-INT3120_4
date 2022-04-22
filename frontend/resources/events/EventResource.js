export const toEventResource = (resource) => {
  return {
    description: resource.description,
    end_at: resource.end_at.split("T")[1],
    event_name: resource.event_name,
    host_id: resource.host_id,
    id: resource.id,
    images: resource.images,
    location: "Not handled",
    start_at: resource.start_at.split("T")[1],
    status: resource.status,
    topic: resource.topic,
    duration: new Date(resource.end_at) - new Date(resource.start_at),
  };
};
