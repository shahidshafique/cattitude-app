import { Stack, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Cat Gallery",
            headerRight: () => (
              <Link href="/upload" style={{ marginRight: 15 }}>
                Upload
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            title: "Upload Cat Image",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}
