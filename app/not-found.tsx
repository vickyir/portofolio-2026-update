import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-caption uppercase tracking-wide text-text-secondary">
        404
      </p>
      <h1 className="mt-4 text-h1 font-semibold text-text-primary">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-body text-text-secondary">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </Container>
  );
}
