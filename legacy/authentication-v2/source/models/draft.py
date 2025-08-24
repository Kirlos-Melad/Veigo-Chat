# from user_agents import parse


# def collect_session_data(device_id: str):
#     # Extract IP Address
#     ip_address = request.remote_addr or request.environ.get('HTTP_X_FORWARDED_FOR', '').split(',')[0]

#     # Parse User-Agent
#     user_agent_string = request.headers.get('User-Agent', '')
#     user_agent = parse(user_agent_string)

#     session_data = {
#         "device_id": device_id,
#         "ip_address": ip_address,
#         "browser_name": user_agent.browser.family,
#         "browser_version": user_agent.browser.version_string,
#         "device_type": user_agent.device.family,
#         "os_name": user_agent.os.family,
#         "os_version": user_agent.os.version_string,
#     }

#     # GeoIP Resolution
#     try:
#         with geoip2.database.Reader(GEOIP_DB_PATH) as reader:
#             geo_data = reader.city(ip_address)
#             session_data.update({
#                 "country": geo_data.country.name,
#                 "region": geo_data.subdivisions.most_specific.name,
#                 "city": geo_data.city.name,
#                 "zip_code": geo_data.postal.code,
#                 "isp": geo_data.traits.isp,  # Optional, may require an ISP-specific database
#             })
#     except Exception as e:
#         print(f"GeoIP lookup failed: {e}")

#     return session_data
