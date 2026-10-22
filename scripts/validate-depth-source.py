"""Read-only aggregate depth validation. No visitor/session/view IDs leave PostHog."""
import importlib.util, json
from pathlib import Path
spec=importlib.util.spec_from_file_location('reader','/home/hermes/.hermes/kanban/attachments/t_2eab56a0/discover_posthog.py')
d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
d.path=Path('../depth-validation-evidence.json')
d.out['scope']='Aggregate read-only depth quality; same fixed historical window; no row-level export.'
w="FROM events WHERE properties.$host='www.baruchiro.com' AND timestamp >= toDateTime('2026-09-24 00:00:00','Asia/Jerusalem') AND timestamp < toDateTime('2026-10-22 00:00:00','Asia/Jerusalem')"
d.out['window']={'start':'2026-09-24T00:00:00+03:00','end':'2026-10-22T00:00:00+03:00','timezone':'Asia/Jerusalem','bounds':'[start,end)'}
d.query('depth_numeric',f"SELECT count() AS leaves,countIf(isNotNull(toFloat64OrNull(toString(properties.$prev_pageview_max_content_percentage)))) AS numeric_depth,countIf(toFloat64OrNull(toString(properties.$prev_pageview_max_content_percentage)) BETWEEN 0 AND 1) AS depth_in_unit_range,min(toFloat64OrNull(toString(properties.$prev_pageview_max_content_percentage))) AS min_depth,max(toFloat64OrNull(toString(properties.$prev_pageview_max_content_percentage))) AS max_depth,countIf(toFloat64OrNull(toString(properties.$prev_pageview_duration)) >= 0) AS nonnegative_duration {w} AND event='$pageleave' LIMIT 1")
# IDs are used only inside the source join; projection is counts only.
leaves=f"SELECT timestamp,toString(properties.$session_id) AS sid,toString(properties.$pageview_id) AS vid,toString(properties.$prev_pageview_pathname) AS path {w} AND event='$pageleave'"
views=f"SELECT toString(properties.$session_id) AS sid,toString(properties.$pageview_id) AS vid,toString(properties.$pathname) AS path,count() AS n,min(timestamp) AS first {w} AND event='$pageview' GROUP BY sid,vid,path"
d.query('pair_quality',f"SELECT count() AS leaves,countIf(p.n=1 AND p.first<=l.timestamp AND l.path=p.path AND notEmpty(l.sid) AND notEmpty(l.vid)) AS uniquely_ordered_matching,countIf(p.n>1) AS duplicate_pageviews,countIf(p.n=0 OR isNull(p.n)) AS unmatched_in_window,countIf(p.n=1 AND (l.path!=p.path OR p.first>l.timestamp)) AS wrong_path_or_order FROM ({leaves}) l LEFT JOIN ({views}) p ON l.sid=p.sid AND l.vid=p.vid LIMIT 1")
d.query('duplicate_leaves',f"SELECT count() AS groups,countIf(n>1) AS duplicate_groups,sum(if(n>1,n-1,0)) AS excess_leaves FROM (SELECT toString(properties.$session_id) AS sid,toString(properties.$pageview_id) AS vid,count() AS n {w} AND event='$pageleave' AND notEmpty(toString(properties.$pageview_id)) GROUP BY sid,vid) LIMIT 1")
