from datetime import datetime

# Function to check if the input date and time are in a valid format
def is_valid_format(event_date):
    # Check if the input matches the format 'MM/DD/YYYY, XX:XX AM/PM'
    if len(event_date) == 19:
        date_part, time_part = event_date.split(", ")
        if len(date_part) == 10 and len(time_part) == 7:
            # Check if the date is in the form MM/DD/YYYY
            date_parts = date_part.split("/")
            if len(date_parts) == 3 and date_parts[0].isdigit() and date_parts[1].isdigit() and date_parts[2].isdigit():
                # Check if the time is in the form XX:XX AM/PM
                if time_part[-2:].upper() in ["AM", "PM"] and time_part[2] == ":" and time_part[:2].isdigit() and time_part[3:5].isdigit():
                    return True
    return False

# Function to get the event date and time from the user
def get_event_date():
    while True:
        # Asking the user for the event date and time in the specified format
        event_date = input("Please enter the event date and time (e.g., '03/29/2025, 05:30 PM'): ")
        
        # Validate the format
        if is_valid_format(event_date):
            # Try to convert the date and time string into a datetime object
            event_datetime = datetime.strptime(event_date, "%m/%d/%Y, %I:%M %p")
            return event_datetime
        else:
            print("Invalid format. Please use this format: 'MM/DD/YYYY, XX:XX AM/PM'.")

# Initialize an empty dictionary to store our events
schedule = {}

# Ask the user how many events they want to add
event_count = int(input("How many events do you want to add to your schedule? "))

# Loop through and ask for the details of each event
for i in range(event_count):
    # Ask for the event name
    event_name = input(f"Enter the name of event #{i + 1}: ")
    
    # Ask for the event date and time
    event_datetime = get_event_date()
    
    # Add the event to the schedule, using the datetime as the key
    schedule[event_datetime] = event_name

# Now let's display the events in order by date and time
print("\nYour event schedule:")
for event_time in sorted(schedule.keys()):
    # Format and print each event in a nice way
    print(f"{event_time.strftime('%m/%d/%Y, %I:%M %p')} - {schedule[event_time]}")