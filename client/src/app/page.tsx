import { gql, useMutation } from "@apollo/client";

const KUNUZ_ADMIN = gql`
  mutation KunUzAdmin($input: KunUzAdminInput!) {
    kunUzAdmin(input: $input) {
      title
      desc
    }
  }
`;

export default function Home() {
  const [publishNews] = useMutation(KUNUZ_ADMIN);

  return <>
    <button onClick={() => {
      publishNews({
        variables: {
          input: {
            title: "Hello World",
            desc: "This is a test",
          },
        },
      })
    }
    }
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Publish News
    </button>
  </>;
}
