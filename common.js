// Configuration for Supabase
const SUPABASE_URL = "https://mkvmvpjkpcgqicycjrlp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdm12cGprcGNncWljeWNqcmxwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjU3NzY5NCwiZXhwIjoyMDYyMTUzNjk0fQ.HtHzuuld0FGvaKLO5eycMi8MCXSBelmKPZCLWZpavng";

// Ceremony image mapping
const CEREMONY_IMAGES = [
  { id: 0, name: "1. Before we start.png", title: "Before we start" },
  { id: 1, name: "1. Before we start.png", title: "Before we start" },
  { id: 2, name: "2. Ganesh Puja.png", title: "Ganesh Puja" },
  { id: 3, name: "3. Jilakara Bellam.png", title: "Jilakara Bellam" },
  { id: 4, name: "4. Kanyadaanam.png", title: "Kanyadaanam" },
  { id: 5, name: "5. Mangalya Dharanam.png", title: "Mangalya Dharanam" },
  { id: 6, name: "6. Talambralu.png", title: "Talambralu" },
  { id: 7, name: "7. Mala Dharanam.png", title: "Mala Dharanam" },
  { id: 8, name: "8. Laaja Homam.png", title: "Laaja Homam" },
  { id: 9, name: "9. Saptapadi.png", title: "Saptapadi" },
  {
    id: 10,
    name: "10. Arundhati Darshanam & Arati.png",
    title: "Arundhati Darshanam & Arati",
  },
];

// Get the image path based on slide number
function getImagePathBySlideNumber(slideNumber) {
  // Default to the first image if not found
  const imageInfo =
    CEREMONY_IMAGES.find((img) => img.id === slideNumber) || CEREMONY_IMAGES[0];

  // Get the base path based on the URL
  const basePath = window.location.pathname.includes("/wedding")
    ? "/wedding"
    : "";

  // Try different paths and return array of paths to try
  return [
    `${basePath}/ceremony/${imageInfo.name}`,
    `./ceremony/${imageInfo.name}`,
    `/ceremony/${imageInfo.name}`,
    `../ceremony/${imageInfo.name}`,
  ];
}

// Initialize Supabase client
function initSupabase() {
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Fetch slide data from Supabase
async function fetchSlideData(supabase) {
  try {
    const { data, error } = await supabase
      .from("slide")
      .select("*")
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching slide data:", error);
    throw error;
  }
}

// Update slide number in Supabase
async function updateSlideNumber(supabase, newSlideNumber) {
  try {
    const { error } = await supabase
      .from("slide")
      .update({ slide_number: newSlideNumber })
      .eq("is_active", true);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating slide number:", error);
    return false;
  }
}

// Get maximum slide number
function getMaxSlideNumber() {
  return CEREMONY_IMAGES.length - 1;
}
